import base_URL from '../Base_URL/Base_URL';

export const get_product_list = async () => {
  return await fetch(base_URL, {
    method: 'GET',
  })
    .then(Response => Response.json())
    .then(async data => {
      if (data) {
        return JSON.stringify(data);
      } else {
        console.log('error');
        return JSON.stringify(data.message);
      }
    })
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
      // ADD THIS THROW error
      return JSON.stringify({
        Data: {error_code: 555, message: 'server side error'},
      });
    });
};

export const get_product_list_details = async prod_id => {
  return await fetch(base_URL + prod_id, {
    method: 'GET',
  })
    .then(Response => Response.json())
    .then(async data => {
      if (data) {
        return JSON.stringify({
          error_code: 200,
          message: 'Success',
          product: data,
        });
      } else {
        console.log('error');
        return JSON.stringify(data.message);
      }
    })
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
      return JSON.stringify({
        Data: {error_code: 555, message: 'server side error'},
      });
    });
};
