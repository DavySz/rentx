import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "styled-components";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { InputPassword } from "../../../components/InputPassword";
import {
    Container,
    Form,
    FormTitle,
    Header,
    Steps,
    Subtitle,
    Title,
} from "./styles";
import { TRouteParams } from "./types";

export function SignUpSecondStep() {
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [password, setPassword] = useState("");

    const { user } = useRoute().params as TRouteParams;
    const navigation = useNavigation();
    const theme = useTheme();

    function handleBack() {
        navigation.navigate("SignUpFirstStep");
    }

    function handleNextScreen() {
        navigation.navigate("SignIn");
    }

    function handleRegister() {
        if (!password || !passwordConfirm) {
            return Alert.alert("Informe a senha, e a confirmação.");
        }
        if (password !== passwordConfirm) {
            return Alert.alert("As senhas não são iguais.");
        }
        return navigation.navigate("Confirmation", {
            onPress: () => handleNextScreen(),
            message: "Conta criada!",
            title: `Agora é só fazer login\ne aproveitar`,
        });
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton
                            onPress={() => handleBack()}
                            type="primary"
                        />
                        <Steps>
                            <Bullet />
                            <Bullet active />
                        </Steps>
                    </Header>

                    <Title>Crie sua{`\n`}conta</Title>
                    <Subtitle>
                        Faça seu cadastro de{`\n`}forma rápida e fácil
                    </Subtitle>

                    <Form>
                        <FormTitle>2. Senha</FormTitle>
                        <InputPassword
                            iconName="lock"
                            placeholder="Senha"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <InputPassword
                            iconName="lock"
                            placeholder="Repetir Senha"
                            value={passwordConfirm}
                            onChangeText={setPasswordConfirm}
                        />
                    </Form>
                    <Button
                        title="Cadastrar"
                        onPress={() => handleRegister()}
                        color={theme.colors.success}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
