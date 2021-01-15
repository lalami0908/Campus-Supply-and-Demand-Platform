import axios from 'axios'
const test_base = 'https://photofunia.com/categories/all_effects/wanted_poster'


const instance = axios.create({ baseURL: test_base })

export const genPost = async () => {//credential:{NTU_ID, password}
  console.log('testing getPost')
  const data = {
    'current-category': 'all_effects',
    'Name': '我就爛',
    'Reward': '都可以',
    'image': '../../src/assets/download.jpg'
  } 

  const res = await instance.post('', data, {param:{server:1}})
  console.log('post return data:',res)
  return res
}
