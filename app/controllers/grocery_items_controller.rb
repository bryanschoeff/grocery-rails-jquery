class GroceryItemsController < ApplicationController
  
  # GET /grocery_items
  # GET /grocery_items.json
  def index
    @grocery_items = GroceryItem.all 
  end

  # GET /grocery_items/1
  # GET /grocery_items/1.json
  def show
    @grocery_item = GroceryItem.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @grocery_item }
    end
  end

  # GET /grocery_items/new
  # GET /grocery_items/new.json
  def new
    @grocery_item = GroceryItem.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @grocery_item }
    end
  end

  # GET /grocery_items/1/edit
  def edit
    @grocery_item = GroceryItem.find(params[:id])
  end

  # POST /grocery_items
  # POST /grocery_items.json
  def create
    @grocery_item = GroceryItem.new(params[:grocery_item])

    respond_to do |format|
      if @grocery_item.save
        format.html { redirect_to @grocery_item, :notice => 'Grocery item was successfully created.' }
        format.json { render :json => @grocery_item, :status => :created, :location => @grocery_item }
      else
        format.html { render :action => "new" }
        format.json { render :json => @grocery_item.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /grocery_items/1
  # PUT /grocery_items/1.json
  def update
    @grocery_item = GroceryItem.find(params[:id])

    respond_to do |format|
      if @grocery_item.update_attributes(params[:grocery_item])
        format.html { redirect_to @grocery_item, :notice => 'Grocery item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @grocery_item.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /grocery_items/1
  # DELETE /grocery_items/1.json
  def destroy
    @grocery_item = GroceryItem.find(params[:id])
    @grocery_item.destroy

    respond_to do |format|
      format.html { redirect_to grocery_items_url }
      format.json { head :no_content }
    end
  end

  def clear
    grocery_items = GroceryItem.where(:done => true);
    
    grocery_items.each do |grocery_item|
      grocery_item.destroy
    end    
    respond_to do |format|
      format.html { redirect_to grocery_items_url }
      format.json { head :no_content }
    end
  end

end
