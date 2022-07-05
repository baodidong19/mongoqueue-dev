export interface QueueQuery {
  _id?: number
  code?: string
  name?: string
  status?: number
}

export interface GetManyQuery {
  _id_eq?: string

  _code_eq?: string

  _name_eq?: string

  _status_eq?: number

  _select?: string

  _nselect?: string

  _limit?: number

  _offset?: number
}

export interface QueueOption {
   _id?: number,
   id_token?: string,
   access_token?: string
}

