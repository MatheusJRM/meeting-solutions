export type WarningModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: string;
  buttonTextCancel: string;
  buttonTextConfirm: string;
  handleActionCancel: () => void;
  handleActionConfirm: () => void;
};
