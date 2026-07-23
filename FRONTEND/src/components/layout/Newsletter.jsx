import AppCard from "../common/AppCard";
import AppButton from "../common/AppButton";


export default function Newsletter() {
    return (
        <div className="flex gap-3">

            <input
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                placeholder="Enter your email"
            />

            <AppButton>
                Subscribe
            </AppButton>

        </div>
    );
}