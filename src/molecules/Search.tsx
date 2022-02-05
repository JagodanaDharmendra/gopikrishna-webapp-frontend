import { Formik, Form } from "formik";
import { Button, Input } from "../atoms";

interface IProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

export interface IFormValues {
  query: string;
}

export default function Search(props: IProps) {
  const handleSubmit = async (values: IFormValues) => {
    onSearch(values.query);
  };

  const onSearch = async (query: string) => {
    if (query && query.length > 0) {
      props.onSearch(query);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values: IFormValues, { setSubmitting }) => {
          handleSubmit(values);
        }}
      >
        {(formikProps) => (
          <Form className="mb-5">
            <div className="flex form-group has-feedback has-clear space-x-2">
              <Input
                name="query"
                placeholder="Filter records..."
                onChange={(e) => {
                  formikProps.handleChange(e);
                }}
                value={formikProps.values.query}
              />
              <Button
                type="submit"
                disabled={!formikProps.values.query}
                primary
                shadow
                className="w-32"
              >
                Submit
              </Button>
              <Button
                type="reset"
                disabled={!formikProps.values.query}
                onClick={() => {
                  props.onClear();
                  formikProps.resetForm();
                }}
                secondary
                shadow
                className="w-32"
              >
                Reset
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
