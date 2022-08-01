
import { Button } from 'react-native-elements';

export const Colors = {
  mainColor: '#81DEA0'
};

const theme = {
  Button: {
    raised: true,
    buttonStyle: { 
      backgroundColor: Colors.mainColor,
      height: 50,
      borderRadius: 10,
    },
    containerStyle:{
      borderRadius: 10,
      width: '80%',
      marginHorizontal: 50,
      marginVertical: 10,
    },
    titleStyle:{
      color: 'white',
      marginHorizontal: 20,
    },
  },
  ActionsContainer: {
    width: '50%',
    justifyContent: 'center',
    marginTop: 'auto',
    marginLeft: 'auto',
    alignItems: 'center',
    zIndex: 1,
  },
    
};

export default theme;