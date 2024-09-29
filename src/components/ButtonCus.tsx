import {Text, TouchableOpacity} from 'react-native';
import {
  ButtonPrimaryStyle,
  ButtonSecondaryStyle,
  styles,
} from '../assets/styles/styles.module';

function ButtonCusPrimary({...props}: any) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        ButtonPrimaryStyle.container,
        props.fixed && styles.btnPriFixedBottom,
        props.style && props.style,
      ]}>
      <Text
        style={[
          ButtonPrimaryStyle.title,
          props.style && props.style['color'] && {color: props.style.color},
        ]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

function ButtonCusSecondary({...props}: any) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        ButtonSecondaryStyle.container,
        props.fixed && styles.btnSecFixedBottom,
      ]}
    >
      <Text style={[ButtonSecondaryStyle.title]}>{props.title}</Text>
    </TouchableOpacity>
  );
}

export {ButtonCusPrimary, ButtonCusSecondary};
