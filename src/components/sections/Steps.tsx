import React from 'react'
import { AnimatedSection } from './AnimatedSection'
import { ArrowRight, GraduationCap, Handshake, UserRoundPlus } from 'lucide-react'

export default function Steps() {
    const steps = [
        {
            icon: <UserRoundPlus />,
            header: "Create an Account",
            description: "Sign up for a free Cosiva account to get started with our interactive programming courses and workshops."
        },
        {
            icon: <UserRoundPlus />,
            header: "Create an Account",
            description: "Sign up for a free Cosiva account to get started with our interactive programming courses and workshops."
        },
        {
            icon: <Handshake />,
            header: "Build your creation",
            description: "Sign up for a free Cosiva account to get started with our interactive programming courses and workshops."
        }
    ]
    return (
        <AnimatedSection className="flex justify-center itemsw-full mt-16 gap-8 md:gap-16">
            {steps.map((step: { icon: React.ReactNode, header: string, description: string }, index: number) => {
                return (
                    <React.Fragment key={index}>
                        <div className="flex flex-col" >
                            <div className='bg-primary rounded-full mx-auto mb-4 w-16 text-white flex items-center justify-center aspect-square'>
                                {step.icon}
                            </div>
                            <span className="text-primary font-thin">
                                Step {index + 1}
                            </span>
                            <span className="font-semibold text-2xl">
                                {step.header}
                            </span>
                            <span className="max-w-96">
                                {step.description}
                            </span>
                        </div>
                        {index !== steps.length - 1 && <ArrowRight className='text-primary' />}
                    </React.Fragment>
                )
            })}
        </AnimatedSection>
    )
}
