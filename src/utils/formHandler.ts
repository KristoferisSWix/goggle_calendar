import { EVENTS_URL } from "../constants";
import { UserEvent } from "../types";

const formHandler = async (formData: FormData) => {
  const formDataValues = [...formData.entries()];
  const validationResult = validateFields(formDataValues);
  if (validationResult === true) {
    const formatedForm = formateForm(formDataValues);
    const result = await postEvent(formatedForm);
    return result;
  } else {
    return validationResult;
  }

  function validateFields(values: [string, FormDataEntryValue][]) {
    const titleValue = values.filter((field) =>
      field[0].includes("event-title")
    )[0];
    const dateValues = values.filter((field) =>
      field[0].includes("event-time")
    );
    const eventStartDate = new Date(dateValues[0][1].toString());
    const eventEndDate = new Date(dateValues[1][1].toString());
    const hasTitle = Boolean(
      typeof titleValue[1] === "string" ? titleValue[1]?.trim().length : false
    );
    const endTimeGreaterThanStart =
      new Date(eventStartDate).getTime() < new Date(eventEndDate).getTime();
    const isSameDay = eventStartDate.getDate() !== eventEndDate.getDate();

    if (!hasTitle) {
      return {
        status: "error",
        target: "title",
        message: "invalid title",
      };
    }
    if (!endTimeGreaterThanStart || isSameDay) {
      return {
        status: "error",
        target: "time",
        message: "invalid time",
      };
    }
    return true;
  }
  function formateForm(values: [string, FormDataEntryValue][]) {
    const camelize = (s: string) => s.replace(/-./g, (x) => x[1].toUpperCase());
    const manipulateObj = <Obj, Key extends keyof Obj>(
      obj: Obj,
      key: Key,
      value: Obj[Key]
    ) => {
      obj[key] = value;
    };

    const formatedObj = {} as UserEvent;

    for (const field of values) {
      const key = camelize(field[0]) as keyof UserEvent;
      if (typeof field[1] === "string" || typeof field[1] === "number") {
        manipulateObj(formatedObj, key, field[1]);
      }
    }

    return formatedObj;
  }

  async function postEvent(data: UserEvent) {
    try {
      const response = await fetch(EVENTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      await response.json();
      return { status: "success" };
    } catch (error) {
      console.error("Error:", error);
      return {
        status: "error",
        target: "uncought",
        message: "something went wrong ",
      };
    }
  }
};
export default formHandler;
