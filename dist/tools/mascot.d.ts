/// <reference types="node" />
declare class Mascot {
    mouthExpressions: string[];
    eyesExpressions: string[];
    moodExpression: {
        happy: string;
    };
    mascot: string;
    log: ((...text: string[]) => void) & {
        clear(): void;
        done(): void;
    };
    interval: NodeJS.Timer;
    duration: number;
    eye: string;
    mouth: string;
    constructor();
    say(messages: string[]): Promise<void>;
    setTalkAnimation(message: string): void;
    clear(): void;
}
export default Mascot;
