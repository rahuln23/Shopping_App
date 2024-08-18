import Snackbar from 'react-native-snackbar';
import {get_product_list, get_product_list_details} from '../config/Apis/apis';
import color from '../config/color/color.json';

export const Get_product_list_data = async (setloading, setproduct_list) => {
  setloading(true);
  const request = await get_product_list();
  try {
    if (request) {
      const parse = JSON.parse(request);
      setproduct_list(parse.products);
      setloading(false);
    }
  } catch (error) {
    setloading(false);
    Snackbar.show({
      text: 'Something went wrong!',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: color.Green,
    });
  }
};

export const Get_product_details = async (
  product_id,
  setloading,
  setproduct_data,
) => {
  setloading(true);
  const request = await get_product_list_details(product_id);
  try {
    if (request) {
      const parse = JSON.parse(request);
      console.log(parse.error_code);
      if (parse.error_code == 200) {
        setproduct_data(parse.product);
        setloading(false);
      } else {
        Snackbar.show({
            text: 'Internet Issue',
            duration: Snackbar.LENGTH_SHORT,
            fontFamily: 'Poppins-Regular',
            backgroundColor: color.Green,
          });
        setloading(false);
      }
    }
  } catch (error) {
    setloading(false);
    Snackbar.show({
      text: 'Something went wrong!',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: 'Poppins-Regular',
      backgroundColor: color.Green,
    });
  }
};
