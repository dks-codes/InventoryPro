export interface WidgetBase {
    widget: string;
    name: string;
    text: string;
    description: string;
    type: string;
    mandatory: boolean;
    value: any;
  }
  
  export interface TextFieldWidget extends WidgetBase {
    disabled: boolean;
    properties: {
      defaultValue: string;
      maxLength: number;
    };
  }
  
  export interface NumberFieldWidget extends WidgetBase {
    properties: {
      defaultValue: number | null;
      min: number;
      max: number;
    };
  }
  
  export interface RadioWidget extends WidgetBase {
    properties: {
      datasource: Array<{ label: string; value: string }>;
      defaultValue: string;
    };
  }
  
  export interface ComboWidget extends WidgetBase {
    properties: {
      datasource: Array<{ label: string; value: string }>;
      multiselect: boolean;
    };
  }
    