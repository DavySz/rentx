/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from "react";
import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native";
import { useTheme } from "styled-components";
import * as Yup from "yup";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";
import { Container, Header, Title, Subtitle, Form, Footer } from "./styles";

export function SignIn() {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required("E-mail obrigatório")
                    .email("Digite um e-mail válido"),
                password: Yup.string().required("A senha é obrigatória"),
            });

            await schema.validate({ email, password });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert("Opa", error.message);
            } else {
                Alert.alert(
                    "Erro na autenticação",
                    "Ocorreu  um erro ao fazer login, varifique as credenciais"
                );
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        backgroundColor="transparent"
                        barStyle="dark-content"
                        translucent
                    />
                    <Header>
                        <Title>Estamos{"\n"}quase lá.</Title>
                        <Subtitle>
                            Faça seu login para começar{"\n"}uma experiência
                            incrível.
                        </Subtitle>
                    </Header>
                    <Form>
                        <Input
                            iconName="mail"
                            autoCorrect={false}
                            placeholder="E-mail"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                            value={email}
                        />
                        <InputPassword
                            iconName="lock"
                            placeholder="Senha"
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>
                    <Footer>
                        <Button
                            title="Login"
                            onPress={() => handleSignIn()}
                            disabled
                            loading={false}
                        />
                        <Button
                            color={theme.colors.background_secondary}
                            title="Criar conta gratuita"
                            onPress={() => {}}
                            disabled
                            loading={false}
                            light
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
