import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings({
    apiKey: "empty",
    batchSize: 512, // Default value if omitted is 512. Max is 2048
    model: "LLaMA_CPP",
    configuration: {
        baseURL: "http://127.0.0.1:8081/v1",
    }
});

const text = "hola don pepito"



const vector = await embeddings.embedDocuments([text])

console.log(vector);