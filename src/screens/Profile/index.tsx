/* eslint-disable import/no-extraneous-dependencies */
import { Feather } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import * as Yup from "yup";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";
import { useAuth } from "../../hooks/auth";
import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    Logout,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section,
} from "./styles";
import { TOptions } from "./types";

export function Profile() {
    const theme = useTheme();
    const netInfo = useNetInfo();
    const { user, signOut, updateUser } = useAuth();
    const navigation = useNavigation();

    const [option, setOption] = useState<TOptions>("data");
    const [driverLicense, setDriverLicense] = useState(user.driver_license);
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);

    function handleBack() {
        navigation.goBack();
    }
    function handleChangeOption(optionSelected: TOptions) {
        if (netInfo.isConnected === false && optionSelected === "password") {
            Alert.alert(
                "Você está Offline",
                "Para mudar a senha conecte-se a internet"
            );
        } else {
            setOption(optionSelected);
        }
    }
    async function handleSelectAvatar() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (result.cancelled) return;
        if (result.uri) {
            setAvatar(result.uri);
        }
    }
    async function handleProfileUpdate() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required("CNH é obrigatória"),
                name: Yup.string().required("Nome é obrigatório"),
            });
            const data = { name, driverLicense };
            await schema.validate(data);

            await updateUser({
                id: user.id,
                user_id: user.user_id,
                email: user.email,
                name,
                driver_license: driverLicense,
                avatar,
                token: user.token,
            });
            Alert.alert("Perfil atualizado!");
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert("Opa", error.message);
            } else {
                Alert.alert("Opa", "Não foi possível atualizar os dados");
            }
        }
    }

    async function handleSignOut() {
        Alert.alert(
            "Tem certeza?",
            "Se você sair, irá precisar de internet para conectar-se novamente.",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Sair",
                    onPress: () => signOut(),
                },
            ]
        );
    }
    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton
                                type="secondary"
                                onPress={() => handleBack()}
                            />
                            <HeaderTitle>Editar Perfil</HeaderTitle>
                            <Logout onPress={() => handleSignOut()}>
                                <Feather
                                    name="power"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </Logout>
                        </HeaderTop>
                        <PhotoContainer>
                            {!!avatar && <Photo source={{ uri: avatar }} />}
                            <PhotoButton onPress={() => handleSelectAvatar()}>
                                <Feather
                                    name="camera"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>
                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                        <Options>
                            <Option
                                active={option === "data"}
                                onPress={() => handleChangeOption("data")}
                            >
                                <OptionTitle active={option === "data"}>
                                    Dados
                                </OptionTitle>
                            </Option>
                            <Option
                                active={option === "password"}
                                onPress={() => handleChangeOption("password")}
                            >
                                <OptionTitle active={option === "password"}>
                                    Trocar senha
                                </OptionTitle>
                            </Option>
                        </Options>
                        {option === "data" ? (
                            <Section>
                                <Input
                                    iconName="user"
                                    placeholder="Nome"
                                    autoCorrect={false}
                                    defaultValue={user.name}
                                    onChangeText={setName}
                                />
                                <Input
                                    iconName="mail"
                                    editable={false}
                                    defaultValue={user.email}
                                />
                                <Input
                                    iconName="credit-card"
                                    placeholder="CNH"
                                    keyboardType="numeric"
                                    defaultValue={user.driver_license}
                                    onChangeText={setDriverLicense}
                                />
                            </Section>
                        ) : (
                            <Section>
                                <InputPassword
                                    iconName="lock"
                                    placeholder="Senha atual"
                                />
                                <InputPassword
                                    iconName="lock"
                                    placeholder="Nova senha"
                                />
                                <InputPassword
                                    iconName="lock"
                                    placeholder="Repetir senha"
                                />
                            </Section>
                        )}
                        <Button
                            title="Salvar alterações"
                            onPress={() => handleProfileUpdate()}
                        />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
