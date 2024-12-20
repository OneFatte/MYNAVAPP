import { Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export const colors = {
    primaryRed: '#E52521',
    secondaryWhite: '#FFFFFF',
    tertiaryBlack: '#1E1E1E',
    fourBlue: '#2F80ED',
    
    primaryGray: '#F9F9FB',
    grayLight: '#A4A9AE',
    grayDark: '#a4a9ae40',
    grayLightCircles: '#a4a9ae1a',

    textPrimary: '#23303B',
    colorSuccess:'#13C999',
    colorError: '#FF6363',
    backgroundSuccess: 'rgba(19, 201, 153, 0.15)',
    backgroundError: 'rgba(255, 99, 99, 0.15)',
};

const { width: screenWidth } = Dimensions.get('window');

export const globalStyles = ScaledSheet.create({

    text: {
        fontFamily: 'SofiaProRegular',
    },

    subtitle: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '800',
        marginVertical: '10@vs',
        fontFamily: 'SofiaProRegular',
    },

    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'SofiaProRegular',
    },

    input: {
        width: '80%',
        fontSize: 14,
        color: 'black',
        borderRadius: 10,
        marginBottom: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },

    navBarIcon: {
        width: 25,
        height: 25,
    },

    linea: {
        height: 1,
        borderBottomWidth: 1,
        width: screenWidth * 0.75,
        borderBottomColor: colors.grayDark,
    },

});