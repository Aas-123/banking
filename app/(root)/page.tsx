import HeaderBox from '@/components/ui/HeaderBox'
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';

const Home = () => {
    const loggedIn = {firstName: 'Aashish', lastName: 'Rawal', email:'Rawalaashish20@gmail.com'};
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox 
                type="greeting"
                title ="Welcome"
                user ={loggedIn?.firstName || 'Guest'}
                subtext ='Access and manage your account and transactions efficently'
                />

                <TotalBalanceBox 
                accounts={[]}
                totalBanks={1}
                totalCurrentBalance={1300}
                
                />
            </header>
            RECENT TRANSACRION
        </div>
        
        <RightSidebar

        user = {loggedIn}
        transcations={[]}
        banks={[{currentBalance:123.50 } , {currentBalance:163.50} ]}
        
         />
    </section>
  )
}

export default Home