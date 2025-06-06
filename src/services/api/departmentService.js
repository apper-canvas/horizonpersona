import departmentData from '../mockData/department.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let departments = [...departmentData]

const departmentService = {
  async getAll() {
    await delay(200)
    return [...departments]
  },

  async getById(id) {
    await delay(150)
    const department = departments.find(dept => dept.id === id)
    if (!department) {
      throw new Error('Department not found')
    }
    return { ...department }
  },

  async create(departmentData) {
    await delay(300)
    const newDepartment = {
      id: Date.now().toString(),
      ...departmentData
    }
    departments = [...departments, newDepartment]
    return { ...newDepartment }
  },

  async update(id, updateData) {
    await delay(250)
    const index = departments.findIndex(dept => dept.id === id)
    if (index === -1) {
      throw new Error('Department not found')
    }
    departments[index] = { ...departments[index], ...updateData }
    return { ...departments[index] }
  },

  async delete(id) {
    await delay(200)
    const index = departments.findIndex(dept => dept.id === id)
    if (index === -1) {
      throw new Error('Department not found')
    }
    departments = departments.filter(dept => dept.id !== id)
    return { success: true }
  }
}

export default departmentService