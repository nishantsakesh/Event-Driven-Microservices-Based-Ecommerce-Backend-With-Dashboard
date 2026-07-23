import PageSection from "../layout/PageSection";
import AppButton from "../common/AppButton";

export default function CTA() {
    return (
        <PageSection>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-16 text-center backdrop-blur-xl">

                <h2 className="text-5xl font-bold">
                    Ready to upgrade your audio experience?
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-slate-400">
                    Discover premium products carefully selected for music lovers, creators and gamers.
                </p>

                <AppButton className="mt-10">
                    Start Shopping
                </AppButton>

            </div>

        </PageSection>
    );
}