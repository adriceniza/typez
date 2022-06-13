export default interface ITypezModal {
  show: boolean;
  form?: any;
  text?: string;
  isQuestion?: boolean;
  customConfirmButtonText?: string;
  customCancelButtonText?: string;
  customOKButtonText?: string;
  icon?: string;
  onOK?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}
