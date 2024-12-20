import { TouchableOpacity, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { colors, globalStyles } from '../../assets/styles/styles';

const MainButton = ({ title, onPress, style }) => {

    const insideStyle = ScaledSheet.create({
        mainButton: {
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: colors.primaryRed,
            borderRadius: 10,
            width: '80%',
        },
    })

    return (
        <TouchableOpacity style={[insideStyle.mainButton, style]} onPress={onPress}>
            <Text style={globalStyles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default MainButton;