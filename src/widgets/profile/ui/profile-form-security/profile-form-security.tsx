import { component$ } from "@builder.io/qwik";
import { cx } from "cva";

export const ProfileSecurityForm = component$(() => {
    return (
        <form
            class={cx(
                "flex flex-col justify-start",
                "md:justify-center",
                "px-4 py-0 m-0",
                "min-w-[100%] min-h-[360px]",
                "md:mb-6",
                "md:min-w-[450px]",
                "md:px-8 md:py-2",
            )}
            method="post"
            noValidate
            preventdefault:submit
        >
            <h2 class="my-0 text-brand-text dark:text-brand-dark-text">Edit profile</h2>
            <hr class="my-2 h-px border-0 bg-gray-400 dark:bg-gray-700" />
            <div class={cx("flex flex-col md:flex-row")}>
                <div class={cx("flex flex-col items-start basis-2/5", "justify-center gap-6 md:flex-row")}></div>
            </div>
        </form>
    );
});
