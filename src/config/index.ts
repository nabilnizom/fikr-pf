const appConfig = {
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27001',
    db: process.env.MONGO_DB || 'potentialforge'
  }
}

export default appConfig