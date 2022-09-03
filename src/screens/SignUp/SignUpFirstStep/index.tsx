/* eslint-disable consistent-return */
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from "react-native";
import * as Yup from "yup";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import {
    Container,
    Form,
    FormTitle,
    Header,
    Steps,
    Subtitle,
    Title,
} from "./styles";

export function SignUpFirstStep() {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [driverLicense, setDriverLicense] = useState("");
    function handleBack() {
        navigation.navigate("SignIn");
    }
    async function handleNextStep() {
        try {
            const scheme = Yup.object().shape({
                name: Yup.string().required("Nome é obrigatório"),
                email: Yup.string()
                    .email("E-mail inválido")
                    .required("E-mail é obrigatório"),
                driverLicense: Yup.string().required("CNH é obrigatória"),
            });
            const data = { name, email, driverLicense };
            await scheme.validate(data);

            navigation.navigate("SignUpSecondStep", {
                user: data,
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert("Opa", error.message);
            }
        }
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
                            <Bullet active />
                            <Bullet />
                        </Steps>
                    </Header>

                    <Title>Crie sua{`\n`}conta</Title>
                    <Subtitle>
                        Faça seu cadastro de{`\n`}forma rápida e fácil
                    </Subtitle>

                    <Form>
                        <FormTitle>1. Dados</FormTitle>
                        <Input
                            iconName="user"
                            placeholder="Nome"
                            onChangeText={setName}
                            value={name}
                        />
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                            value={email}
                        />
                        <Input
                            iconName="credit-card"
                            placeholder="CNH"
                            keyboardType="numeric"
                            onChangeText={setDriverLicense}
                            value={driverLicense}
                        />
                    </Form>
                    <Button title="Próximo" onPress={() => handleNextStep()} />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
