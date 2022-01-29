import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, FormikProps } from "formik";
import { Button, Input, Label, Select } from "../../../atoms";
import { Tab } from "@headlessui/react";


export interface IFormValues {
  name: string;
  family_history: string;
  recommendations: string;
}

export interface IProps {
  onSubmit: () => void;
  onChange: (key: string, value: string) => void;
}


const OTForm = () => {
  return (
    <div className="">
      <p>OT</p>
      <Formik
        initialValues={{ name: "", email: "" }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <Input name="name" type="text" />
          <Input name="email" type="email" />
          <Button primary type="submit">
            <Label title="Submit" />
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default OTForm;
