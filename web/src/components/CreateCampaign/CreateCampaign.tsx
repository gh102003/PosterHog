import { Collapsible, Form } from "radix-ui";
import styles from "./CreateCampaign.module.css"
import { useState } from "react";

type Props = {
    handleSubmit: (name: string, destination: string) => Promise<void>
}

export function CreateCampaign({handleSubmit}: Props) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <Collapsible.Root open={open} onOpenChange={setOpen}>
            <Collapsible.Trigger className={styles.newPosterBtn}>Create new poster campaign</Collapsible.Trigger>
            <Collapsible.Content className={styles.content}>
                <Form.Root className={styles.formRoot}
                    onSubmit={(event) => {
                        const data = Object.fromEntries(new FormData(event.currentTarget));

                        // Submit form data and catch errors in the response
                        handleSubmit(data.name as string, data.destination as string)
                            .then(() => {setOpen(false)});
                        // prevent default form submission
                        event.preventDefault();
                    }}
                >
                    <Form.Field className={styles.Field} name="name">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "baseline",
                                justifyContent: "space-between",
                            }}
                        >
                            <Form.Label className={styles.Label}>Name</Form.Label>
                            <Form.Message className={styles.Message} match="valueMissing">
                                Please enter your email
                            </Form.Message>
                            <Form.Message className={styles.Message} match="tooShort">
                                Please provide a longer name
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <input className={styles.Input} type="text" minLength={4} required />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field className={styles.Field} name="destination">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "baseline",
                                justifyContent: "space-between",
                            }}
                        >
                            <Form.Label className={styles.Label}>Link</Form.Label>
                            <Form.Message className={styles.Message} match="valueMissing">
                                Enter a link to open when the QR code is scanned
                            </Form.Message>
                            <Form.Message className={styles.Message} match="typeMismatch">
                                Please provide a valid link
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <input className={styles.Input} type="url" required />
                        </Form.Control>
                    </Form.Field>
                    <Form.Submit asChild>
                        <button className={styles.Button} style={{ marginTop: 10 }}>
                            Create poster
                        </button>
                    </Form.Submit>
                </Form.Root>
            </Collapsible.Content>
        </Collapsible.Root>
    );
}