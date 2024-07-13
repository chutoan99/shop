import api from '../../configs/configAxios';

export const GetCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token-shopee');
    const response = await api({
      method: 'get',
      url: 'user/current',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    // toast.error(error.msg);
  }
};

// export const UpdateUser = async (payload: any) => {
//   try {
//     const token = localStorage.getItem('token-shopee');
//     let data = new FormData();
//     data.append('sex', +payload.sex);
//     data.append('email', payload.email);
//     data.append('name', payload.name);
//     data.append('address', payload.address);
//     data.append('birthday', payload.birthday);
//     data.append('phone', +payload.phone);
//     data.append('avatar', payload.avatar);
//     const response = await instance({
//       method: 'put',
//       url: 'user',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       data: data,
//     });

//     if (response?.status === 200) {
//       return response.data;
//     }
//   } catch (error: any) {
//     toast.error(error.msg);
//   }
// };
