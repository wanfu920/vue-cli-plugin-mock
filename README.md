# vue-cli-plugin-xmock
A Vue CLI 3 Plugin for mock data

### 🚗 Getting Started
1. Create app
```bash
vue create my-app && cd my-app
```
2. Install vue-cli-plugin-xmock
```bash
vue add xmock
```
OR
```bash
npm i -D vue-cli-plugin-xmock
```
3. Create mock file
```bash
mkdir mock && touch test.mock.js
```
```javascript
// mock/test.mock.js
module.exports = {
  'GET /api/user': {
    code: 0,
    msg: 'success',
    data: {
      id: '001',
      name: 'vue-cli-plugin-xmock user',
    }
  }
}
```
4. Run
```bash
npx vue-cli-service serve --mock
curl http://localhost:8080/api/user
```

### 🚀 Usage
#### mock 文件支持两种风格
1. JSON 风格
```javascript
const { Random } = require('mockjs')
module.exports = {
  'GET /api/user': {
    code: 0,
    msg: 'success',
    data: {
      id: Random.id(),
      name: Random.name(),
    }
  }
}
```
2. Express 风格
```javascript
const { Random } = require('mockjs')
module.exports = {
  'GET /api/user': (req, res) => {
    res.json({
      code: 0,
      msg: 'success',
      data: {
        id: Random.id(),
        name: Random.name(),
      }
    })
  }
}
```

#### 高级功能
根据你的想象力，你可以使用express的任何能力，满足你所有的mock需求
1. 动态 mock
```javascript
const { Random } = require('mockjs')
module.exports = {
  'GET /api/list': (req, res) => {
    if (req.query.type === 'group') {
      return res.json({
        code: 0,
        msg: 'success',
        data: [{
          id: Random.id(),
          groupName: Random.name(),
        }]
      })
    }
    return res.json({
      code: 0,
      msg: 'success',
      data: [{
        id: Random.id(),
        name: Random.name(),
      }]
    })
  }
}
```

2. 联动 mock
```javascript
const { Random } = require('mockjs')
const list = []
module.exports = {
  'POST /api/user':  (req, res) => {
    const newUser = {
      id: Random.id(),
      name: req.query.name || Random.name(),
    }
    list.push(newUser)
    res.json({
      code: 0,
      msg: 'success',
      data: newUser
    })
  },
  'GET /api/users': {
    code: 0,
    msg: 'success',
    data: list
  }
}
```