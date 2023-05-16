import mongoose from 'mongoose'

export const initConnect = () => {
  mongoose.connect(
    'mongodb://logs-owner:logs_owner_pass@112.126.64.221:11027/crm_behaviors',
    {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }
  )
  let db = mongoose.connection

  db.on('error', console.error.bind(console, '连接错误:'))

  db.once('open', function () {
    console.log('mongodb connect success!')
  })
}
