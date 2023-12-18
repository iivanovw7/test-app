import { component$, useContext } from "@builder.io/qwik";
import { LuGithub, LuUsers } from "@qwikest/icons/lucide";
import { Button, Chip } from "@/shared/components";
import { RootContext } from "@/shared/context";
import { cva, cx } from "cva";

const icon = cva(["block h-4 w-4"], {
    variants: {
        color: {
            success: ["stroke-brand-success"],
            error: ["stroke-brand-error"],
            normal: ["stroke-current"],
        },
    },
});

export const Footer = component$(() => {
    let { userCount } = useContext(RootContext);

    return (
        <footer class={cx("max-w-screen-xl mx-auto", "w-full h-footer min-h-footer", "flex flex-row items-center")}>
            <div class={cx("w-full mx-auto px-8", "max-w-none xl:ml-0", "flex flex-row justify-between items-center")}>
                <div class={cx("flex flex-row items-center no-wrap gap-1")}>
                    <div class="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                        <div class="flex flex-row items-center gap-1">
                            <LuUsers class={icon({ color: "success" })} />
                            <span class="text-sm">user count:</span>
                            <Chip class="ml-1">{userCount}</Chip>
                        </div>
                    </div>
                </div>
                <div>
                    <Button
                        href="https://github.com/iivanovw7/rust-solid-app"
                        variant="transparent"
                        color="tertiary"
                        rel="noreferer"
                        target="_blank"
                        size="small"
                        as="link"
                    >
                        <LuGithub class={icon({ color: "normal" })} />
                    </Button>
                </div>
            </div>
        </footer>
    );
});
