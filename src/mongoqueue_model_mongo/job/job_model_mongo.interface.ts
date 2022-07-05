export interface JobQuery {
  _id?: number
  id_token?: string
  access_token?: string
  expires_at?: Date
}

export interface GetManyQuery {
  _id_eq?: string

  _id_token_eq?: string

  _access_token_eq?: string

  _orgid_eq?: string

  _select?: string

  _nselect?: string

  _limit?: number

  _offset?: number
}

export interface JobOption {
   _id?: number,
   id_token?: string,
   access_token?: string
}

