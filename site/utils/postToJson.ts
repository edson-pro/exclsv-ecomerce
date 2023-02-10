export function postToJSON(doc: any) {
  const data = doc.data();
  return {
    ...data,
    id: doc.id,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt?.toMillis() || 0,
    updatedAt: data?.updatedAt?.toMillis() || 0,
    updated: data?.updatedAt?.toMillis() || 0,
    date: data?.date?.toMillis() || 0,
  };
}
