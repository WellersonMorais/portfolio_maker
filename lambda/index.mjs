import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "ElasticPortfolioW";

export const handler = async (event) => {
    // 1. VARIÁVEIS DE AMBIENTE: Trazemos a segurança para fora do código-fonte
    const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

    // 2. CORS RESTRITO: Adicionamos o 'Authorization' nos headers permitidos
    const headers = {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    };

    try {
        if (event.httpMethod === 'OPTIONS' || (event.requestContext?.http?.method === 'OPTIONS')) {
            return { statusCode: 200, headers, body: 'OK' };
        }

        const method = event.httpMethod || event.requestContext?.http?.method;

        // ROTA POST: SALVAR O PORTFÓLIO (AGORA PROTEGIDA!)
        if (method === 'POST') {
    
            const body = JSON.parse(event.body);
            
            // 4. IDENTIFICADOR ÚNICO: Usamos o UUID gerado no Front-end
            const userId = body.portfolioId;

            if (!userId) {
                return { statusCode: 400, headers, body: JSON.stringify({ message: "ID do portfólio não fornecido." }) };
            }

            const command = new PutCommand({
                TableName: TABLE_NAME,
                Item: {
                    userId: userId,
                    portfolioData: body
                }
            });

            await docClient.send(command);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: "Portfólio salvo com sucesso!", userId: userId })
            };
        }

        // ROTA GET: BUSCAR O PORTFÓLIO (PERMANECE PÚBLICA PARA LEITURA)
        if (method === 'GET') {
            const userId = event.queryStringParameters?.user;

            if (!userId) {
                return { statusCode: 400, headers, body: JSON.stringify({ message: "Usuário não fornecido." }) };
            }

            const command = new GetCommand({
                TableName: TABLE_NAME,
                Key: { userId: userId }
            });

            const response = await docClient.send(command);

            if (!response.Item) {
                return { statusCode: 404, headers, body: JSON.stringify({ message: "Portfólio não encontrado." }) };
            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(response.Item.portfolioData)
            };
        }

        return { statusCode: 400, headers, body: JSON.stringify({ message: "Método HTTP não suportado." }) };

    } catch (error) {
        console.error("Erro na Lambda:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: "Erro interno no servidor.", error: error.message })
        };
    }
};