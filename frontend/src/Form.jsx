import React from "react";
import {
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

const Form = ({setData}) => {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const sendData = async () => {
    const { data } = await axios.post("http://localhost/api/users", form.values);
    setData(data);
    console.log(data);
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" fw={500} align="center">
        Лол, это лаб 5 ёпт
      </Text>

      <Divider labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {sendData()})}>
        <Stack>
          <TextInput
            required
            label="First name"
            placeholder="Andrew"
            value={form.values.firstName}
            onChange={(event) =>
              form.setFieldValue("firstName", event.currentTarget.value)
            }
            radius="md"
          />

          <TextInput
            required
            label="Last name"
            placeholder="Clark"
            value={form.values.lastName}
            onChange={(event) =>
              form.setFieldValue("lastName", event.currentTarget.value)
            }
            radius="md"
          />
          <TextInput
            required
            label="email"
            placeholder="example@gg.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            radius="md"
          />
        </Stack>

        <Group justify="center" mt="xl">
          <Button type="submit" radius="xl">
            Send
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default Form;
