interface Irequest {
  headers: {
    authorization: string
  }
}

interface Iconnection {
  authorization: string
}

export interface Icontext {
  req: Irequest;
  connection: Iconnection;
}
