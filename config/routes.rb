Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users,only: [:edit,:update] do
    get :search, on: :collection
  end
  resources :groups,only: [:new, :create, :edit, :update] do
    resources :messages,only: [:index, :create]
  end
end
