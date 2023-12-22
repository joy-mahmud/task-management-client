import developer from '../../assets/rear-view-programmer-working-all-night-long.jpg';
import banker from '../../assets/business-man-counting-dollar-banknote-online-business-concept.jpg';
import corporate from '../../assets/creative-people-working-office.jpg';

const Users = () => {
    return (
        <div className='mt-10 container mx-auto'>
            <h2 className='text-6xl font-bold text-center mb-5'>Who benifits from us</h2>
            <div className='flex gap-3 items-center'>
                <img className='h-[350px] lg:w-[650px]' src={developer} alt="" />
                <div className='flex-1'>
                    <h2 className='text-center text-4xl font-bold mb-3'>Developers</h2>
                    <p>Ideal for developers seeking streamlined task management for projects, with intuitive features tailored to coding workflows.</p>
                    <div className='ml-10 mt-3'>
                        <h2 className='text-2xl font-bold'>benifits</h2>
                        <p>Seamless task organization for coding sprints.</p>
                        <p>Collaboration tools designed for tech teams.</p>
                        <p>Integration capabilities with developer tools and version control systems.</p>
                    </div>
                </div>
            </div>
            <div className='flex gap-3 items-center mt-5 justify-between'>
                <div className='lg:w-[650px]'>
                <img className='h-[350px] lg:w-[650px]'  src={banker} alt="" />
                </div>
                <div className='flex-1'>
                    <h2 className='text-center text-4xl font-bold mb-3'>Bankers</h2>
                    <p>Suited for finance professionals requiring meticulous task management and deadline adherence,with intuitive features tailored to coding workflows</p>
                    <div className='ml-10 mt-3'>
                        <h2 className='text-2xl font-bold'>benifits</h2>
                        <p>Task prioritization aligned with financial schedules.</p>
                        <p>Collaboration tools designed for tech teams.</p>
                        <p>Reporting and analytics for financial project milestones.</p>
                    </div>
                </div>
            </div>
            <div className='flex gap-3 items-center mt-5'>
                <img className='h-[350px] lg:w-[650px]'  src={corporate} alt="" />
                <div className='flex-1'>
                    <h2 className='text-center text-4xl font-bold mb-3'>Corporate professionals</h2>
                    <p>Tailored for corporate environments, providing comprehensive task tracking and team coordination functionalities.</p>
                    <div className='ml-10 mt-3'>
                        <h2 className='text-2xl font-bold'>benifits</h2>
                        <p>Centralized project oversight for managers.</p>
                        <p>Task delegation and progress monitoring for team leads.</p>
                        <p>Integration capabilities with developer tools and version control systems.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Users;