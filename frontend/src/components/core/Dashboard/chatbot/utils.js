import { EventSourceParserStream } from 'eventsource-parser/stream';
import { TextDecoderStream } from 'text-encoding';


export async function* parseSSEStream(stream) {
  const sseStream = stream
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new EventSourceParserStream())
  
  for await (const chunk of sseStream) {
    if (chunk.type === 'event') {
      yield chunk.data;
    } 
  }
}