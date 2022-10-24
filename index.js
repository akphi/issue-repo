import { axios } from "axios";

await axios.post(
  `http://localhost:6300/pure/v1/grammar/grammarToJson/model`,
  "",
  {
    // headers: {
    //   [HttpHeader.CONTENT_TYPE]: ContentType.TEXT_PLAIN,
    // },
    // params: {
    //   returnSourceInformation: false,
    // },
  }
);
