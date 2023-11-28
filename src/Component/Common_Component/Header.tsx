import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

const Header = ({
    bg,
    title,
    leftIcon,
    rightIcon,
    onLeftPress,
    onRightPress,
    children,
}) => {
    return (
        <SafeAreaView>
            <View style={[styles.header, { backgroundColor: bg }]}>
                <Icon
                    name={leftIcon}
                    size={30}
                    color={'white'}
                    onPress={onLeftPress}
                    style={{ marginRight: 'auto' }}
                />
                <Text style={styles.title}>{title}</Text>
                <Icon
                    name={rightIcon}
                    size={30}
                    color={'white'}
                    onPress={onRightPress}
                    style={{ marginLeft: 'auto' }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        width: width,
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Header;
