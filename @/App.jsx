import HomePage from '@/components/pages/HomePage'
{/* Render the component based on the activeTab */}
                    {activeTab === 'dashboard' ? (
                      <HomePage />
                    ) : (
                      <currentRoute.component />
                    )}