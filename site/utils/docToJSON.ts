export function docToJSON(doc: any) {
  const data = doc;
  return {
    ...data,
    id: doc.id,
  };
}
