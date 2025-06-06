import documentData from '../mockData/document.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let documents = [...documentData]

const documentService = {
  async getAll() {
    await delay(280)
    return [...documents]
  },

  async getById(id) {
    await delay(200)
    const document = documents.find(doc => doc.id === id)
    if (!document) {
      throw new Error('Document not found')
    }
    return { ...document }
  },

  async create(documentData) {
    await delay(400)
    const newDocument = {
      id: Date.now().toString(),
      ...documentData,
      uploadDate: new Date().toISOString().split('T')[0]
    }
    documents = [...documents, newDocument]
    return { ...newDocument }
  },

  async update(id, updateData) {
    await delay(300)
    const index = documents.findIndex(doc => doc.id === id)
    if (index === -1) {
      throw new Error('Document not found')
    }
    documents[index] = { ...documents[index], ...updateData }
    return { ...documents[index] }
  },

  async delete(id) {
    await delay(250)
    const index = documents.findIndex(doc => doc.id === id)
    if (index === -1) {
      throw new Error('Document not found')
    }
    documents = documents.filter(doc => doc.id !== id)
    return { success: true }
  }
}

export default documentService