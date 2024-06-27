import type { ComponentProps } from "svelte";
import { Button } from "../button";

export type Element = ComponentProps<Button> & { label: string };
