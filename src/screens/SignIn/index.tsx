/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { useTheme } from "styled-components";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";
import { Container, Header, Title, Subtitle, Form, Footer } from "./styles";

export function SignIn() {
    const theme = useTheme();
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
                        />
                        <InputPassword iconName="lock" placeholder="Senha" />
                    </Form>
                    <Footer>
                        <Button
                            title="Login"
                            onPress={() => {}}
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
