import { Db, Document, Sort } from 'mongodb';

export const asignDocumentId = async (
  database: Db,
  collection: string,
  sort: Sort = { registerDate: -1 }
): Promise<any> => {
  const lastElement = await database
    .collection(collection)
    .find()
    .limit(1)
    .sort(sort)
    .toArray()

  if (lastElement.length === 0) {
    return 1;
  }

  return lastElement[0].id + 1
};

export const findOneElement = async (
  database: Db,
  collection: string,
  filter: object
): Promise<Document | null> => database.collection(collection).findOne(filter)

export const findElements = async (
  database: Db,
  collection: string,
  filter: object = {}
): Promise<Document[]> => database.collection(collection).find(filter).toArray()

export const insertOneElement = async (
  database: Db,
  collection: string,
  document: object
): Promise<Document | null> => database.collection(collection).insertOne(document)

export const insertManyElements = async (
  database: Db,
  collection: string,
  documents: Array<object>
): Promise<Document | null> => database.collection(collection).insertMany(documents)
