export declare type Config = {
  name: string,
  browser: string,
  output: string,
  match: string,
}

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD'

interface Header {
  key: string,
  value: string
}

interface URL {
  raw: string,
  host: Array<string>,
  path: Array<string>
}

interface Request {
  method: string | Method,
  header: Header,
  url: URL
}

export interface PostmanCollection {
  info: {
    name: string,
    schema: string
  },
  item: [
    {
      name: string,
      request: Request,
      response: [
        {
          name: string,
          originalRequest: Request,
          status: string,
          code: number,
          header: Header,
          cookie: Header,
          body: string
        }
      ]
    }
  ]
}
