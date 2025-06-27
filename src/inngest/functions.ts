import { inngest } from "./client";
import { openai, createAgent } from "@inngest/agent-kit"

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {

 const Summarizer = createAgent({
      name: "writer",
      system: "You are an expert Summarizer.  You Summarize in 2 words",
      model: openai({ model: "gpt-4o" ,  }),
    });

      const { output } = await Summarizer.run(`Summarize the following text : ${event.data.value} `);
    console.log("Summarized Output:", output);


    await step.sleep("wait-a-moment", "5s");

    return { output };
  },
);
