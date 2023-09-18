// const { isLoading, mutateAsync } = useMutation(
//   ["recover_password"],
//   recoverPassword,
//   {
//     onSuccess: () => {
//       toast({
//         title: "Success",
//         description: "We've sent you an email to recover your password",
//       });
//     },
//     onError: (error: any) => {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   },
// );
// const { toast } = useToast();
// const sendEmail = () => {
//   if (!store?.user?.email) return;
//   mutateAsync({
//     reset_url: "http://localhost:4321/password-reset?key={reset_key}",
//     email: store.user.email,
//   });
// };
