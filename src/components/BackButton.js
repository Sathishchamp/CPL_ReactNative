import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { withNavigation } from 'react-navigation';

class BackButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          paddingLeft: 10
        }}
        onPress={() => this.props.navigation.goBack()}
      >
        <Icon
          name='arrowleft'
          type='AntDesign'
          style={{ color: '#ffffff', height: 25, width: 25 }}
        />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(BackButton);
